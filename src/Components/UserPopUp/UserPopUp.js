import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../../Store/Reducer/PopUpSlice";
import { createUser, updateUser } from "../../Store/Reducer/UserSlice";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  status: Yup.string().required("Status is required"),
});

function UserPopUp() {
  const isOpen = useSelector((state) => state.popup.isOpen);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {currentUser ? "Edit User" : "Add User"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            gender: currentUser?.gender || "male",
            status: currentUser?.status || "",
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              console.log("Submitting values:", values);
              if (currentUser) {
                await dispatch(updateUser({ userId: currentUser.id, updatedData: values })).unwrap();
              } else {
                await dispatch(createUser(values)).unwrap();
              }
              dispatch(closePopup());
            } catch (error) {
              console.error("Error submitting form:", error);
              setErrors({ submit: "There was an issue submitting the form. Please try again." });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-3">
                <label className="block text-sm font-medium">Name:</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Name..."
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Email..."
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Gender:</label>
                <div className="flex gap-4">
                  <label className="flex">
                    <Field className="mr-1" type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label className="flex">
                    <Field className="mr-1" type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Status:</label>
                <Field as="select" name="status" className="w-full p-2 border rounded-md">
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500" />
              </div>

              {errors.submit && <div className="text-red-500 mb-3">{errors.submit}</div>}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={() => dispatch(closePopup())}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserPopUp;
