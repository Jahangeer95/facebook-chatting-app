export function PostDropDown({onSelect}) {
  return (
    <div className="flex flex-col p-2 shadow text-center">
      <ul className="divide-y divide-gray-300">
        <li className="cursor-pointer hover:text-blue-600 mb-2" onClick={()=>onSelect("text")}>Text</li>
        <li className="cursor-pointer hover:text-blue-600 mb-2"onClick={()=>onSelect("media")}>Media</li>
      </ul>
    </div>
  );
}
