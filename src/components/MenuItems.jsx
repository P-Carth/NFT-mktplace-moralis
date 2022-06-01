import {React , useState} from "react";
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
				background: "#A020F0",
				display: "flex",
				width: "100%",
				justifyContent: "center",
			}}
			defaultSelectedKeys={[pathname]}>
			{/*
			<Menu.Item key='/quickstart'>
				<Link href='/quickstart'>
					<Button size="large" shape="round" type="text">
					<a>Quick Start</a>
					</Button>
				</Link>
			</Menu.Item>
			*/}

			<Menu.Item key='/explore'>
				<Link href='/explore'>
					<Button size="large" shape="round" type="text">
					<a>Explore</a>
					</Button>
				</Link>
			</Menu.Item>

			{/*
			<Menu.Item key='/wallet'>
				<Link href='/wallet'>
					<Button size="large" shape="round" type="text">
					<a>Wallet</a>
					</Button>
				</Link>
			</Menu.Item>
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
			<Menu.Item key='/nftMarket'>
				<Link href='/nftMarket'>
					<Button size="large" shape="round" type="text">
					<a>NFT Market</a>
					</Button>
				</Link>
			</Menu.Item>
			<Menu.Item key='/nftBalance'>
				<Link href='/nftBalance'>
					<Button size="large" shape="round" type="text">
					<a>My NFTs</a>
					</Button>
				</Link>
			</Menu.Item>

			{/*
			<Menu.Item key='/contract'>
				<Link href='/contract'>
					<Button size="large" shape="round" type="text">
					<a>Contract</a>
					</Button>
				</Link>
			</Menu.Item>
			*/}
		</Menu>
	);
}

export default MenuItems;
