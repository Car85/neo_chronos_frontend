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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = (index: number) => {
    setActiveIndex(index);
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
                <div
                  key={index}
                  onClick={() => handleLinkClick(index)}
                  className={`submenu-link ${activeIndex === index ? 'active' : ''}`}
                >
                  {child}
                </div>
              ))
            : <div onClick={() => handleLinkClick(0)} className={`submenu-link ${activeIndex === 0 ? 'active' : ''}`}>{props.children}</div>}
        </div>
      )}
    </div>
  );
};
