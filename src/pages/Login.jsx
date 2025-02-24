import React from "react";
import { Formik, Form } from "formik";
import Input from "../components/form/Input";
import LocatorWhiteLogo from "../assets/images/logo/locator_white.svg";
import LocatorBlueLogo from "../assets/images/logo/locator_blue.png";
import PasswordInput from "../components/form/PasswordInput";
import CheckBoxInput from "../components/form/CheckBoxInput";
import Button from "../components/UI/Button";
import {
  useManageUserMutation,
  useManageVehiclesMutation,
  usePostLoginMutation,
  useValidateUserMutation,
} from "../store/api/login.api";
import { ShowNotification } from "../services/ShowNotification";
import {
  LaravelRequestHandler,
  NodeRequestHandler,
} from "../services/Requests";

import $ from "jquery";
import { MAIN_DOMAIN_URL } from "../config/api.urls";
import { getStorage, setStorage } from "../services/LocalStorage";
import { cloneDeep } from "lodash";

import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const LoginPage = () => {
  const [postLogin] = usePostLoginMutation();
  const [validateUser] = useValidateUserMutation();
  const [manageUser] = useManageUserMutation();
  const [manageVehicles] = useManageVehiclesMutation();

  const saveMember = getStorage("saveMember", "object");
  const initialValues = saveMember
    ? { ...saveMember, remember: true }
    : { user_name: "", user_password: "", remember: false };

  const manageUserAccount = async (data) => {
    try {
      const user = {
        organization: data.organisation.id,
        user_id: data.id,
        deviceToken: localStorage.getItem("deviceTKN") || "",
        name: data.name,
        profile: data.photo,
        username: data.email,
      };
      NodeRequestHandler(manageUser, user);
    } catch (error) {
      console.log("Error in manageUserAccount", error);
    }
  };

  const manageUserVehicles = async (vehiclesList) => {
    try {
      NodeRequestHandler(manageVehicles, { vehicles: vehiclesList });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const createTraccarSession = (email, password) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${MAIN_DOMAIN_URL}/gps/api/session`,
        dataType: "json",
        type: "POST",
        data: { email, password },
        xhrFields: { withCredentials: true },
        success: function (data) {
          resolve(data); // ✅ Resolve after success
        },
        error: function (error) {
          console.log("Traccar Session Error", error);
          reject(error);
        },
      });
    });
  };

  // function will filter vehicles based on group id
  const filterByIds = (groupID, vehicles, groupsIds) => {
    var v = [];
    var ids = [];

    vehicles.map((vehicle) => {
      // Show in Map
      vehicle.showInMap = true;

      if (vehicle.groupId === 0) {
        vehicle.groupId = -1;
      }

      if (vehicle.attributes.groupId && vehicle.groupId !== -1) {
        vehicle.groupId = parseInt(vehicle.attributes.groupId);
      }

      if (groupsIds.indexOf(vehicle.groupId) == -1) {
        vehicle.groupId = -1;
      }

      if (vehicle.groupId === groupID) {
        ids.push(vehicle.id);
        v.push(vehicle);
      }
    });

    return { v, ids };
  };

  // vehicles as map with vehicles id as key
  const __filterByIds__ = (groupID, vehicles, groupsIds) => {
    var v = {};

    vehicles.map((vehicle) => {
      // Show in Map
      vehicle.showInMap = true;
      vehicle.checked = false;

      if (vehicle.groupId === 0) {
        vehicle.groupId = -1;
      }

      if (vehicle.attributes.groupId && vehicle.groupId !== -1) {
        vehicle.groupId = parseInt(vehicle.attributes.groupId);
      }

      if (groupsIds.indexOf(vehicle.groupId) == -1) {
        vehicle.groupId = -1;
      }

      if (vehicle.groupId === groupID) {
        v[vehicle.id] = vehicle;
      }
    });

    return v;
  };

  const handleSumbit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const data = { ...values, isAdmin: "customer" };
    delete data.remember;

    try {
      const success = await LaravelRequestHandler(postLogin, data);

      // valid iot user
      // const isValidIOTUser = await NodeRequestHandler(validateUser, {
      //   username: data.user_name,
      //   organization: success?.user?.organisation?.id,
      // });

      // if (!isValidIOTUser) {
      //   ShowNotification(
      //     "error",
      //     "You are not authorized to access IOT Application."
      //   );
      //   return;
      // }

      // for adding user to Users
      if (success && success?.user) {
        await manageUserAccount(success.user);
        await createTraccarSession(values.user_name, values.user_password);

        // creating traccar session

        let groups = cloneDeep(success?.groups);
        let vehicles = cloneDeep(success?.vehicles || []);
        vehicles = filterIotDevices(vehicles);

        // other tasks
        if (groups === null || groups.length === 0) {
          groups = [];
        }

        groups = success.groups.filter(
          (item) => item.attributes?.type === "IotDevice"
        );

        groups.push({
          id: -1,
          name: success.user.name,
        });

        if (values?.remember) {
          setStorage("saveMember", data, "object");
        } else {
          localStorage.removeItem("saveMember");
        }

        // not filtered
        setStorage("groups_info", groups, "object");

        // setStorage("__modules__", success.modules, "object");
        setStorage("total__vehicles__", vehicles.length);
        setStorage("__user__", success.user, "object");
        setStorage("__token__", success.token);
        setStorage("org_id", success.user.organisation.id);

        const groupsIds = groups.map((g) => g.id);

        let veh = {};
        let groupedVehicles = [];

        await manageUserVehicles(vehicles);

        groups?.forEach((group) => {
          const vIdes = filterByIds(group.id, vehicles, groupsIds);
          group = { ...group, vehicles: vIdes.v };
          group.vehiclesIds = vIdes.ids;
          group.showInMap = true;

          const _v = __filterByIds__(group.id, vehicles, groupsIds);
          group.__vehicles__ = _v;
          veh = { ...veh, ..._v };
          groupedVehicles.push(group);
        });

        console.log({ groups });
        setStorage("__groups__", groupedVehicles, "object");
        setStorage("__vehicles__", veh, "object");
        setStorage("iotDeviceIds", Object.keys(veh), "object");

        window.location.href = "/iot-beacon";
      }
    } catch (error) {
      console.log(error);
      ShowNotification("error", error?.message || "Invalid Credentials");
    }
  };

  const filterIotDevices = (vehicles) => {
    return vehicles?.filter((vehicle) => vehicle.category === "IotDevice");
  };

  const handleAppsLinks = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen flex-row-between">
      <div className="flex-row-center w-2/3 h-screen login-bg-img px-5">
        <div className="h-screen flex-col-between items-start w-full">
          <div className="my-5">
            <img src={LocatorWhiteLogo} width={150} height={80} />
          </div>
          <q className="text-white text-center text-xl italic mx-auto max-w-md">
            Powering insights for powerful machines — track, monitor, and
            optimize your equipment anytime, anywhere.
          </q>
          <footer className="text-slate-200 hover:text-white text-center text-md my-5">
            <p>
              For support, contact us at
              <a href="mailto:Customercare@locator.ae">
                {" "}
                Customercare@locator.ae
              </a>
            </p>
          </footer>
        </div>
      </div>
      {/* Login Form */}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.user_name) {
            errors.user_name = "*Username is required";
          }
          if (!values.user_password) {
            errors.user_password = "*Password is required";
          }
          return errors;
        }}
        onSubmit={handleSumbit}
      >
        {/* Email Field */}
        {({ isSubmitting }) => (
          <div className="flex-row-center w-1/3 h-screen login-bg">
            <Form className="w-full max-w-sm flex-col-center gap-5 shadow-lg rounded-lg bg-white px-8 py-10">
              <div className="flex-row-center mb-5">
                <img src={LocatorBlueLogo} width={150} height={80} />
              </div>

              <Input
                type="text"
                name="user_name"
                placeholder="Username"
                required={true}
              />

              <PasswordInput
                type="password"
                name="user_password"
                placeholder="Password"
                required={true}
              />

              <div className="flex-row-between">
                <CheckBoxInput
                  placeholder="Remember me"
                  type="checkbox"
                  id="remember"
                  name="remember"
                />

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <div>
                <Button type="submit" isSubmitting={isSubmitting} className="w-full py-2">
                  Sign in
                </Button>
              </div>
              <div className="mt-3 pt-5 mb-3 flex justify-around items-center">
                <div>
                  <div
                    onClick={() =>
                      handleAppsLinks(
                        "https://apps.apple.com/us/app/my-locator-plus/id1255777829"
                      )
                    }
                    className="flex bottom-icons-container justify-around items-center ml-2"
                  >
                    <FaApple color="white" size={28} />
                    <div className="flex flex-col justify-around items-center">
                      <span className="text-[10px] text-white">
                        Available in
                      </span>
                      <span className="text-[11px] text-white">App Store</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() =>
                      handleAppsLinks(
                        "https://play.google.com/store/apps/details?id=com.synosys.locator&hl=en"
                      )
                    }
                    className="flex bottom-icons-container justify-around items-center ml-2"
                  >
                    <IoLogoGooglePlaystore color="white" size={28} />
                    <div className="flex flex-col justify-around items-center">
                      <span className="text-[10px] text-white">
                        Available in
                      </span>
                      <span className="text-[11px] text-white">
                        Google Play
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
