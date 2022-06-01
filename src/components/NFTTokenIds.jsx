import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import {
	FileSearchOutlined,
	SendOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "helpers/networks";

/* 
#################################################################
################	Experimental Explore Page	#################
#################################################################
*/

const Explore = () => {
    const { Moralis, chainId } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const [count, setCount] = useState(0);
    const [nftObject, setnftObject] = useState({});
    const [nftArray, setNftArray] = useState([]);
    const [artist, setArtist] = useState('');

    const fetchAllTokenIds = async () => {
        
        const options = {
            // NFT Collection Address
            address: "0x7470Ea065E50e3862cd9b8fB7C77712165da80e5", 
            // Chain
            chain: 'rinkeby',
            // # of NFTs
            limit: 50
        }
        // Moralis Built-in Query
        const NFTs = await Web3Api.token.getAllTokenIds(options);
        let total = NFTs.result.length;
        
        setCount(total);
        // console.log(total);

        setNftArray([...NFTs.result])
        // console.log(NFTs.result);

        setnftObject(NFTs)
        // console.log(nftObject)
    }

    const handleSelectOption = async (e) => {
        
        console.log(e.target.value);
        await e.target.value;
        fetchAllTokenIds(e.target.value);
    }

    //run fetchAllTokenIds()
    useEffect(() => {
        fetchAllTokenIds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className='explore'>
            {/*
            <h4>NFT Collection Total is {count}</h4>
            */}			
            {nftObject? 
                <div className='card-row'>
                {nftArray.map((items, index) => {
                    // eslint-disable-next-line no-lone-blocks
                    {/* console.log(items) */}
                    const {metadata, token_id, token_uri} = items
                    const metaData = JSON.parse(metadata)
                    
                    const {name, description, image} = metaData;

                    if (image.includes('ipfs://ipfs')) {
                            image = "https://ipfs.infura.io/"+image.split("//")[1]
                        } else if (image.includes('ipfs://')) {
                            image = "https://ipfs.infura.io/ipfs/"+image.split("//")[1]
                        }
                    
                    console.log("**********************these are metData: ", metaData)
                    return (
                        <Card
								hoverable
								key={index}
								actions={[
									
									<Tooltip
										title='View On Blockexplorer'
                                        key={index}>
										<FileSearchOutlined
											onClick={() =>
												window.open(
													`${getExplorer(
														chainId,
													)}address/${
														items.token_address
													}`,
													"_blank",
												)
											}
										/>
									</Tooltip>,

									<Tooltip
										title='Place Bid'
                                        key={index}>
										<ShoppingCartOutlined
                                            key={index}
											onClick={() =>
												alert(
													"EZPZ INTEGRATION COMING!",
												)
											}
										/>
									</Tooltip>,
								]}
								style={{
									width: 240,
									border: "2px solid #e7eaf3",
								}}
								cover={
									<img
                                        className="card-img-top" 
                                        src={image}
                                        alt="Card img cap" 
                                        style={{maxHeight: "300px"}}
										key={index}
									/>
								}>
								<Card.Meta
									title={name}
									description={description}
                                    style = {{color: "#0000000"}}
								/>
							</Card>
                    )  
                })}
            </div>
            
            : 
            <></>}
            
        </div>
    )
}

export default Explore;