export default function TabButton({children, onSelect, isSelected}) {

    function handleClick(){
        console.log(`Button  clicked`);
    }

  return (
    <li>
        <button className={isSelected ? 'active' : undefined} onClick={onSelect} >{children}</button>
    </li>
  );
}