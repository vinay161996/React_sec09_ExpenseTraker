import Button from "react-bootstrap/Button";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../store/actions/expense";

const ExpenseForm = ({ classesDark }) => {
  const updatingExpense = useSelector(
    (state) => state.expenses.updatingExpense
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addExpense({ ...data }));
    reset();
  };

  useEffect(() => {
    setValue("amount", updatingExpense.amount);
    setValue("description", updatingExpense.description);
    setValue("category", updatingExpense.category);
  }, [setValue, updatingExpense]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          data={updatingExpense}
          error={errors?.amount?.message}
          label="Amount"
          id="amount"
          type="number"
          {...register("amount", {
            required: "Required*",
            min: {
              value: 1,
              message: "Amount should be greater than 0",
            },
          })}
        />
        <Input
          error={errors?.description?.message}
          label="Description"
          id="description"
          type="text"
          {...register("description", {
            required: "Required*",
          })}
        />
        <select
          className={`focus-ring ${
            !!classesDark && "text-white"
          } focus-ring-secondary form-select mt-4 bg-transparent`}
          aria-label="Default select example"
          {...register("category", {
            required: "Required*",
          })}
        >
          <option className={`${!!classesDark && "bg-black"}`} value="">
            Category
          </option>
          <option className={`${!!classesDark && "bg-black"}`} value="food">
            Food
          </option>
          <option className={`${!!classesDark && "bg-black"}`} value="petrol">
            Petrol
          </option>
          <option className={`${!!classesDark && "bg-black"}`} value="salary">
            Salary
          </option>
        </select>
        {errors?.category?.message && (
          <p className="text-danger m-0">{errors.category.message}</p>
        )}
        <Button className="mt-3" type="submit" variant="outline-secondary">
          Add expense
        </Button>
        <Button
          onClick={() => reset()}
          className="mt-3 mx-2"
          variant="outline-danger"
        >
          Reset
        </Button>
      </form>
    </>
  );
};

export default ExpenseForm;
