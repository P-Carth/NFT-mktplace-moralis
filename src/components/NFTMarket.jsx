import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api, useMoralisQuery} from 'react-moralis';
import { Card, Image, Tooltip, Modal, Badge, Alert, Spin, PageHeader  } from "antd";
import {
    FacebookFilled,
	FileSearchOutlined,
	SendOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import { contractABI, rinkebyContractAddress, ERC721ApproveABI, rinkebyERC721ContractAddress } from '../contracts/contractABI';
import { useIPFS } from 'hooks/useIPFS';


/* 
#################################################################
################	Experimental Explore Page	#####################
#################################################################
*/

const NFTMarket = () => {
    const { Moralis, chainId, walletAddress} = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const [NFTcount, setCount] = useState(0);
    const [nftObject, setnftObject] = useState({});
    const [nftObjectArray,setnftObjectArray] = useState([]);
    const [nftArray] = useState([]);
    const [artist, setArtist] = useState('');
    const [image, setImage] = useState(null);
    const { resolveLink } = useIPFS();
   // const fetch = useMoralisQuery();

   const [nftToBuy, setNftToBuy] = useState(null);    
   const queryMarketItems = useMoralisQuery("CreatedMarketItems");
   const fetchMarketItems = JSON.parse(
     JSON.stringify(queryMarketItems.data, [
       "objectId",
       "createdAt",
       "price",
       "nftContract",
       "itemId",
       "sold",
       "tokenId",
       "seller",
       "owner",
       "confirmed",
     ])
   );
   const [visible, setVisibility] = useState(false);
   const [loading, setLoading] = useState(false);
   const purchaseItemFunction = "createMarketSale";
   const contractABIJson = JSON.parse(contractABI);
   const contractProcessor = useWeb3ExecuteFunction(); 
    
   console.log("##################################################################################");

   async function getNFTListings(){
        const web3 = await Moralis.enableWeb3();
        const MyMoralisDatabase = Moralis.Object.extend("CreatedMarketItems"); 
        const query = new Moralis.Query(MyMoralisDatabase);
        query.equalTo("sold", false);
        const data = await query.find();
        const count = await query.count();
        //const thisImage = await fetch(data.attributes.token_uri)
        //const resThisImage = await thisImage.json()
        setCount(count);
        nftObjectArray = [];
        console.log("this is data" ,data); 
        //console.log("finally the good part", typeof data[0]["attributes"]["sold"])
        //console.log("finally the good part", data[0]["attributes"]["sold"])

        const nftObjectArray = await Promise.all(data.map(async item => {
            const options = { address: item.attributes.nftContract, chain: "rinkeby", token_id: item.attributes.tokenId };
            const nftOwner = await Moralis.Web3API.token.getTokenIdMetadata(options);

            console.log("So this is where the magic happen",nftOwner)
            // if the NFT's metadata is missing, fetch the NFT's token_uri and parse though it 
            if (nftOwner.metadata === null) {
            try {
                await fetch(nftOwner.token_uri)
                  .then((response) => response.json())
                  .then((data) => {
                    let image = resolveLink(data.image);
                    console.log("🥳👍👍👍",image)

                  });
              } catch (error) {
                console.log("😥😥😥😥", error);
              }
            }
            /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
              Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
              Replace <your url here> with your proxy server_url below
              Remove comments :)
  
                try {
                  await fetch(`<your url here>/${NFT.token_uri}`)
                  .then(response => response.json())
                  .then(data => {
                    NFT.image = resolveLink(data.image);
                  });
                } catch (error) {
                  setFetchSuccess(false);
                }
  
            */


            return nftOwner
        }))
        

        //console.log("So this is the objectArray then: ", nftObjectArray)


        setnftObjectArray(nftObjectArray);
        //setArtist("nothing changed");
        
        
    }
    useEffect(() => {
        getNFTListings()
    }, []);
    console.log("This is the in-between version: ", nftObjectArray);

 
    
    console.log("Most updated version2: ", nftObjectArray);
    console.log("the moment of truth: ", artist);

    /*          Doesn't work async problem
    let totalerrors = 0;
    let badnfts = []
    for (let nft of nftObjectArray) {
        if (!nft.metadata) {
            console.log("There were a total of ", nft.metadata, "errors")
            totalerrors = totalerrors + 1;
            //badnfts.append(...nft.token_uri);
            try {
                await fetch(nft.token_uri)
                  .then((response) => response.json())
                  .then((data) => {
                    nft.image = resolveLink(data.image);
                  });
              } catch (error) {
                setFetchSuccess(false);
        }
    }
    console.log("There were a total of ", totalerrors, "errors")
    */

    /*
    async function reSyncMetadata() {
        const options = {
          address: "0x7de3085b3190b3a787822ee16f23be010f5f8686",
          token_id: "1",
          flag: "metadata",
        };
        const result = await Moralis.Web3Api.token.reSyncMetadata(options);
        console.log(result);
      };

      const fixednftObjectArray = await Promise.all(data.map(async (items,index) => {
        const options = { address: item.attributes.nftContract, chain: "rinkeby", token_id: item.attributes.tokenId };
        const nftOwner = await Moralis.Web3API.token.getTokenIdMetadata(options);
        /*const object = {
             image: data.image,
             animation_url: data.animation_url && data.animation_url,
             tokenId: item.attributes.tokenId,
             nftOwner: nftOwner.owner_of
        } 
        return nftOwner
    }))

    useEffect(() => {
        reSyncMetadata()
    }, []) 
    */


    /*const fetchAllTokenIds = async () => {
        /*
        const options = {
            address: "0xB74bf94049D2c01f8805B8b15Db0909168Cabf46",
            chain: 'rinkeby',
            limit: 50
        }
        
        

        const NFTs = await Web3Api.token.getAllTokenIds(options);
        let total = NFTs.result.length;
        
        setCount(total);
        // console.log(total);

        setNftArray([...NFTs.result])
        // console.log(NFTs.result);

        setnftObject(NFTs)
        // console.log(nftObject)
    } */
    console.log("Checking, all still good?", nftObjectArray)
    // useEffect(()=> {
    //     console.log('this is from useEffect artist: ', artist)
    // }, [artist])


    async function purchase() {
        const web3 = await Moralis.enableWeb3(); 
        setLoading(true);
        const tokenDetails = getMarketItem(nftToBuy);
        const itemID = tokenDetails.itemId;
        const tokenPrice = tokenDetails.price;
        const ops = {
          contractAddress: rinkebyContractAddress,
          functionName: purchaseItemFunction,
          abi: contractABIJson,
          params: {
            nftContract: nftToBuy.token_address,
            itemId: itemID,
          },
          msgValue: tokenPrice,
        };
    
        await contractProcessor.fetch({
          params: ops,
          onSuccess: () => {
            console.log("success");
            setLoading(false);
            setVisibility(false);
            updateSoldMarketItem();
            succPurchase();
          },
          onError: (error) => {
            setLoading(false);
            failPurchase();
          },
        });
      }
    
      const handleBuyClick = (items) => {
        setNftToBuy(items);
        console.log(items.image);
        setVisibility(true);
      };
    
      function succPurchase() {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: "Success!",
          content: `You have purchased this NFT`,
        });
        setTimeout(() => {
          modal.destroy();
        }, secondsToGo * 1000);
      }
    
      function failPurchase() {
        let secondsToGo = 5;
        const modal = Modal.error({
          title: "Error!",
          content: `There was a problem when purchasing this NFT`,
        });
        setTimeout(() => {
          modal.destroy();
        }, secondsToGo * 1000);
      }
    
      async function updateSoldMarketItem() {
        //const web3 = await Moralis.enableWeb3();
        const id = getMarketItem(nftToBuy).objectId;
        const marketList = Moralis.Object.extend("CreatedMarketItems");
        const query = new Moralis.Query(marketList);
        await query.get(id).then((obj) => {
          obj.set("sold", true);
          obj.set("owner", walletAddress);
          obj.save();
        });
      }
    
      const getMarketItem = (items) => {
        const result = fetchMarketItems?.find(
          (e) =>
            e.nftContract === items?.token_address &&
            e.tokenId === items?.token_id &&
            e.sold === false &&
            e.confirmed === true
        );
        return result;
      };


    

    return(
        
        <div className='explore'>
            {/*
            <h2>There are {NFTcount} NFTs available</h2>
            */}
            {nftObjectArray? 
                <div className='card-row'>
                {nftObjectArray.map((items, index) => {
                    // eslint-disable-next-line no-lone-blocks
                    {/* console.log(items) */}
                    const {metadata, token_id, token_uri} = items
                    //console.log("**********************these are items: ", items, index)
                    
                    var name, description, image;
                    
                    const metaData = JSON.parse(metadata);
                    //console.log("**********************these are metData: ", metaData.name)
                    if (metaData === null) {
                        name = items.name;
                        description = "unknown";
                        //image = items.token_uri;

                        //image = JSON.parse(unparsedimage);

                        
                    }
                    else {
                        name = metaData.name;
                        description = metaData.description;
                        image = metaData.image;

                        if (image.includes('ipfs://ipfs')) {
                            image = "https://ipfs.infura.io/"+image.split("//")[1]
                        } else if (image.includes('ipfs://')) {
                            image = "https://ipfs.infura.io/ipfs/"+image.split("//")[1]
                        }
                    };
                    
                    //const name = metaData.name;
                    //const image = metaData.image;
                    //const description = metaData.description;
                    
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
                                    <Tooltip title="Buy NFT">
                                    <ShoppingCartOutlined onClick={() => handleBuyClick(items)} />
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
                                        alt="Missing image" 
                                        style={{maxHeight: "300px"}}
										key={index}
									/>
								}>
								<Card.Meta
									title={name}
									description={items?.contract_type?.toLowerCase()}
                                    style = {{color: "#0000000"}}
								/>
							</Card>
                            
                    )  
                })}
                            {getMarketItem(nftToBuy) ? (
                                    <Modal
                                    title={`Buy ${ nftToBuy?.name} #${nftToBuy?.token_id}`}
                                    visible={visible}
                                    onCancel={() => setVisibility(false)}
                                    onOk={() => purchase()}
                                    okText="Buy"
                                    onChange={console.log("Just a test")}
                                    >
                                    <img
                                            src={JSON.parse(nftToBuy?.metadata).image}
                                            style={{
                                                width: "250px",
                                                margin: "auto",
                                                borderRadius: "10px",
                                                marginBottom: "15px"
                                            }}
                                    />
                                    <Spin spinning={loading}>
                                        <div
                                        style={{
                                            width: "250px",
                                            margin: "auto",
                                        }}
                                        >
                                        <Badge.Ribbon
                                            color="green"
                                            text={`${
                                            getMarketItem(nftToBuy).price / ("1e" + 18)
                                            } ${nftToBuy.name}`}
                                        >
                                
                                        </Badge.Ribbon>
                                        </div>
                                    </Spin>
                                    
                                    </Modal>
                                ) : (
                                    <Modal
                                    title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
                                    visible={visible}
                                    onCancel={() => setVisibility(false)}
                                    onOk={() => setVisibility(false)}
                                    >

                                    <img
                                        src={(nftToBuy?.image)}
                                        style={{
                                        width: "250px",
                                        margin: "auto",
                                        borderRadius: "10px",
                                        marginBottom: "15px",
                                        }}
                                    />
                                    {/*<Alert
                                        message="This NFT is currently not for sale"
                                        type="warning"
                                    />*/}
                                    </Modal>
                                )}

            </div>
            
            : 
            <></>}
            
        </div>
    )
}

export default NFTMarket;