import React from "react";
import {
  getLaravelReqHeaders,
  LaravelRequestHandler,
} from "../../services/requests";
import {
  useEditObjectMutation,
  useFetchSingleObjectDetailsQuery,
} from "../../store/api/groups.api";
import MiniLoader from "../UI/MiniLoader";
import { Form, Formik } from "formik";
import Input from "../form/Input";
import { getStorage } from "../../services/LocalStorage";
import SelectInput from "../form/SelectInput";
import Button from "../UI/Button";

import { ShowNotification } from "../../services/ShowNotification";

const MachineAddEditForm = ({ editMachineId, toggleModal }) => {
  if (!editMachineId) return null;

  const [editObject, { isLoading: isSubmitting }] = useEditObjectMutation();

  const groupOptions = getStorage("groups_info", "object");

  const timeZoneOptions = [
    {
      value: "Dubai",
      title: "Dubai",
    },
    {
      value: "Kuwait",
      title: "Kuwait",
    },
  ];

  const headers = getLaravelReqHeaders();

  const {
    data: machineDetails,
    isLoading,
    error,
  } = useFetchSingleObjectDetailsQuery({ editMachineId, headers });

  const initialValues = machineDetails && machineDetails[0];

  if (isLoading) return <MiniLoader />;
  if (error) return <div>Error fetching machine details</div>;

  const handleEditMachine = async (values) => {
    try {
      const fullData = { ...initialValues, ...values };
      await LaravelRequestHandler(editObject, {
        body: fullData,
        editMachineId,
      });
      ShowNotification("success", "Machine Edited successfully");
      toggleModal();

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.log({ error });
      ShowNotification("error", "Something went wrong, please try again later");
    }
  };

  return (
    <Formik
      initialValues={machineDetails[0]}
      // validationSchema={validationSchema}
      onSubmit={handleEditMachine}
    >
      {({ values }) => (
        <Form className="my-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-3">
              <Input placeholder="Machine Name" name="obj_name" edit={true} />

              <SelectInput
                label="Machine Group"
                name="obj_group_id"
                options={groupOptions}
                valueKey="id"
                titleKey="name"
                edit={true}
              />

              <Input
                placeholder="Manufactured Year"
                name="obj_manufacture_date"
                edit={true}
              />
              <Input
                placeholder="Machine Description"
                name="obj_device_description"
                edit={true}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Input placeholder="Payload" name="obj_payload" edit={true} />
              <Input
                placeholder="Engine Number"
                name="obj_engine_number"
                edit={true}
              />
              <Input
                placeholder="Chassis Number"
                name="obj_chassis_number"
                edit={true}
              />

              <SelectInput
                label="Timezone"
                name="obj_time_zone"
                options={timeZoneOptions}
                valueKey="value"
                titleKey="title"
                edit={true}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Input
                placeholder="Type"
                name="vehicelType"
                disabled={true}
                edit={true}
              />
              <Input
                placeholder="Device ID"
                name="obj_device_id"
                disabled={true}
                edit={true}
              />
              <Input
                placeholder="Object ID"
                name="obj_id"
                disabled={true}
                edit={true}
              />
              <Input
                placeholder="Installation Date"
                name="createdTime"
                disabled={true}
                edit={true}
              />
            </div>
          </div>

          <div className="mt-7 w-full gap-3 flex justify-end items-center">
            <Button color="white" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="submit" isSubmitting={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MachineAddEditForm;
