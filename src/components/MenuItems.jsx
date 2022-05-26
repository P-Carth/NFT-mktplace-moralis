import React from "react";
import { useRouter } from "next/router";
import { Menu, Button } from "antd";
import Link from "next/link";

function MenuItems() {
	const { pathname } = useRouter();

	return (
		<Menu
			theme='light'
			mode='horizontal'
			style={{
				background: "#04192e",
				display: "flex",
				width: "100%",
				justifyContent: "center",
			}}
			defaultSelectedKeys={[pathname]}>
			<Menu.Item key='/quickstart'>
				<Link href='/quickstart'>
					<Button size="large" shape="round" type="text">
					<a>Quick Start</a>
					</Button>
				</Link>
				{/* <Link href='/quickstart'>
					<a>Quick Start</a>
				</Link> */}
			</Menu.Item>

			<Menu.Item key='/wallet'>
				<Link href='/wallet'>
					<Button size="large" shape="round" type="text">
					<a>Wallet</a>
					</Button>
				</Link>
			</Menu.Item>
			{/*
			<Menu.Item key='/1inch'>
				<Link href='/1inch'>
					<a>🏦 Dex</a>
				</Link>
			</Menu.Item>
			<Menu.Item key='onramp'>
				<Link href='/onramp'>
					<a>💵 Fiat</a>
				</Link>
			</Menu.Item>
			<Menu.Item key='/erc20balance'>
				<Link href='/erc20balance'>
					<a>💰 Balances</a>
				</Link>
			</Menu.Item>
			<Menu.Item key='/erc20transfers'>
				<Link href='/erc20transfers'>
					<a>💸 Transfers</a>
				</Link>
			</Menu.Item>
			*/}
			<Menu.Item key='/nftBalance'>
				<Link href='/nftBalance'>
					<Button size="large" shape="round" type="text">
					<a>NFTs</a>
					</Button>
				</Link>
			</Menu.Item>

			<Menu.Item key='/contract'>
				<Link href='/contract'>
					<Button size="large" shape="round" type="text">
					<a>Contract</a>
					</Button>
				</Link>
			</Menu.Item>
		</Menu>
	);
}

export default MenuItems;