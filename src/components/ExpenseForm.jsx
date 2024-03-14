import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../store/actions/expense";

const ExpenseForm = () => {
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
      <Row style={{ maxWidth: "600px" }}>
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
            className="focus-ring focus-ring-secondary form-select mt-4 bg-transparent border-2 border-dark border-opacity-50 "
            aria-label="Default select example"
            {...register("category", {
              required: "Required*",
            })}
          >
            <option value="">Category</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
          {errors?.category?.message && (
            <p className="text-danger m-0">{errors.category.message}</p>
          )}
          <Button className="mt-3" type="submit" variant="outline-secondary">
            Add expense
          </Button>
        </form>
      </Row>
    </>
  );
};

export default ExpenseForm;
