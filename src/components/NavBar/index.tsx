import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";

const NavBar: React.FC<{
	items: any;
}> = ({ items }) => {
	const location = useLocation();
	const [currentPathname, setCurrentPathname] = useState(location?.pathname);

	useEffect(() => {
		setCurrentPathname(location?.pathname);
	}, [location]);

	return (
		<Menu
			selectedKeys={[currentPathname]}
			mode="horizontal"
			items={items}
			style={{
				height: "50px",
			}}
		/>
	);
};

export default NavBar;
