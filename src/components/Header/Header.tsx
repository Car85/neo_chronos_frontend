import './style.css';
import { useRef, useState } from "preact/hooks";


interface SubMenuProps {
  label: string;
  parentOpen: boolean;
  children: preact.ComponentChildren;
  labelColor?: string;
  labelClass?: string;
}

export const SubMenu = (props: SubMenuProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div id="menu_seasons">
      <div ref={itemRef} onClick={toggleMenu} className={props.labelClass} style={{ color: props.labelColor, cursor: 'pointer' }}>
        {props.label}
      </div>
      {open && (
        <div className="submenu">
          {Array.isArray(props.children)
            ? props.children.map((child, index) => (
                <div key={index} onClick={handleLinkClick} className="submenu-link">
                  {child}
                </div>
              ))
            : <div onClick={handleLinkClick} className="submenu-link">{props.children}</div>}
        </div>
      )}
    </div>
  );
};
