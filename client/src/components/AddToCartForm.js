import { useForm } from 'react-hook-form';

export default function AddToCartForm({ product }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      quantity: 1,
    }
  }) 

  const onSubmit = formData => {
    console.log({...product, ...formData} || "no data");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="quantity">Quantity :</label>
      <br />
      <input 
        type="number" 
        name="quantity" 
        className="mt-2"
        {...register("quantity", {
          setValueAs: v => parseInt(v),
          required: "The quantity is required !",
          min: {
            value: 1,
            message: "The quantity cannot be lower than 1 !"
          },
          max: {
            value: product.attributes.quantity,
            message: `The quantity cannot be higher than ${product.attributes.quantity}`
          },
          validate: {
            integer: v => Number.isInteger(v) || 'The quantity should be an integer !',
          }
        })} />
      <input
        type="submit"
        className="btn btn-primary ms-2"
        value="Add to cart"
      />
      <p>
        {errors.quantity?.message}
      </p>
    </form>
  );
}