import React from "react";
import { Layout } from "antd";
import Text from "antd/lib/typography/Text";

import Account from "./Account";
import Chains from "./Chains";
import TokenPrice from "./TokenPrice";
import NativeBalance from "./NativeBalance";
import MenuItems from "./MenuItems";
import Logo from "./Logo";

import "antd/dist/antd.css";
import "styles/style.module.css";

const { Header, Footer } = Layout;

const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		fontFamily: "Roboto, sans-serif",
		color: "#041836",
		marginTop: "130px",
		padding: "10px",
	},
	header: {
		position: "fixed",
		zIndex: 1,
		width: "100%",
		background: "#A020F0",
		display: "flex",
		/*justifyContent: "center", */
		fontFamily: "Verdana, sans-serif",
		/* borderBottom: "2px solid rgba(0, 0, 0, 0.06)", */
		padding: "0 20px",
		boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
		margin: "auto",
		alignItems: "center",
	},
	headerRight: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		fontSize: "15px",
	},
};

function BaseLayout({ children }) {
	return (
		<Layout style={{ height: "100vh", overflow: "auto" }}>
			<Header style={styles.header}>
				<Logo />
				<MenuItems />
				<div style={styles.headerRight}>
					{/* <Chains /> */}
					<Account />
				</div>
			</Header>
			<div style={styles.content}>{children}</div>
			<Footer style={{ textAlign: "center" }}>
				<Text style={{ display: "block" }}>
					⭐️ Please star this{" "}
					<a
						href='https://github.com/P-Carth/NFT-mktplace-moralis'
						target='_blank'
						rel='noopener noreferrer'>
						NFT Marketplace
					</a>
					, every star makes us very happy!
				</Text>
				
				
			</Footer>
		</Layout>
	);
}

export default BaseLayout;
