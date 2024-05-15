export function CostsPc({ post, daysDiff }) {
  return (
    <ul className="w-full p-6">
      <li className="flex flex-row w-full justify-between py-1">
        <p>{`${post.rent_price} x ${daysDiff} noches`}</p>
        <p>{`${post.rent_price * daysDiff}€`}</p>
      </li>
      <li className="flex flex-row w-full justify-between py-1">
        <p>Gastos de limpieza</p>
        <p>{`${(post.rent_price * 24) / 100}€`}</p>
      </li>
      <li className="flex flex-row w-full justify-between py-1">
        <p>Impuestos</p>
        <p>{`${(post.rent_price * 21) / 100}€`}</p>
      </li>
      <li className="flex flex-row w-full justify-between border-t pt-6 mt-5">
        <p className="font-semibold">Total</p>
        <p className="font-semibold">{`${
          post.rent_price * daysDiff +
          (post.rent_price * 24) / 100 +
          (post.rent_price * 21) / 100
        }€`}</p>
      </li>
    </ul>
  );
}
