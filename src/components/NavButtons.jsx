import React from "react";
import { useRouter } from "next/router";
import { Menu, Button, Row, Col } from "antd";
import Link from "next/link";

function MenuItems() {
  const { pathname } = useRouter();

  const items = [
    { label: "Quick Start", key: "item-1" },
    { label: "Wallet", key: "item-2" },
    { label: "NFTs", key: "item-3" },
    { label: "Contract", key: "item-4" },
  ];

  return (
    <Row gutter={[8, 8]}>
        <Col ><Button>Quick Start</Button></Col>
        <Col ><Button>Wallet</Button></Col>
        <Col ><Button>NFTs</Button></Col>
        <Col ><Button>Contract</Button></Col>
    </Row>
  );
}

export default MenuItems;
