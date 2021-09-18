> ## Project-5 :  Decentralized File Storage System Based On IPFS

> IPFS- InterPlanetary File System

> Solidity,Web3,Ethereum,Ganache

> React for frontend UI




> #### App Screenshots
‍💜🚀------‍💜‍----->🚀


****Version 1.0.0(development localhost)****
<img src="./project_images/">


> #### Features



***


***

==============================================================================

> ##                    DEVELOPER SECTION

===============================================================================

> #### Blueprint

- [x] User connects with Ganache(blockchain)
- [x] React frontend connects with Ganache
- [x] User upload files via user interface built in React
- [x] React UI uploads files to IPFS behind the scenes.
- [x] IPFS returns with file hash and sends this to React 
- [x] React UI adds file hash to smart contract(already on ganache)
- [x] finally user can view or download file via React UI backed by IPFS

> #### Tech Stack
- Node
- truffle framework
- ganache
- metamask (browser connection with blockchain)
- React
- Web3


> #### Dev logs

- [ ] write smart contract via truffle
- [ ] use truffle to migrate Smart contract to ganache.
- [ ]  add smart contract to blockchain(ganache) block
- [ ] metamask connection
    - [ ] connect with blockchain via web3 to access wallet
    - [ ] connect with blockchain via web3 access blockchain(ganache)
- [ ] Run app React
    - [ ] connect app with blockchain via web3
    - [ ] upload file via UI
- [ ] publish file in IPFS via UI
- [ ] return file hash back to UI
- [ ] add file hash to smart contract(ganache)
- [ ] get transaction approved by web3,metamask,user interactions
- [ ] add file hash,addr to smart contract
- [ ] view & download file from IPFS

 
 

> ## Dev Notes

> ###  IPFS
- **HTTP addresses locations https://google.com -> points to an IP address of a machine hosting the content.**
- **Interplanetary file system flips this, i.e Our system IP addresses the content.**
            
            ipfs://content-id/

- decentralized content among peers gets established, you cant just take it down

> #### Content

- **Each piece of content is hashed with metadata creating a unique identifier called CID**
- **HTML,image,video etc**
- **content is immutable any update to content creates new CID**

                # to access a content on IPFS
                ipfs://CID/

> #### Routing(IMPORTANT)

- **distributed hash tables(DHT) maps CID->to peer addresses that has content**

                ipfs://x
                # asking for CID=x
                # will query the DHT to retreive all peers that has that particular CID
                # DHT server (ipfs server) hosts DHT's
                # DHT client (ipfs client) is a client that can connect to DHT server


> #### Publishing Content

- **Content that we want to share on ipfs is hashed into unique CID(content id)**
- **local DHT is updated CID->your ip address/port**
- **DHT will be updated to all connected peers(Note that the content is not propagated to peers i.e only you are the host of the CID)**
- **people searching for your CID will be connected to you and only you and when they explicitely download only then they will be hosting that CID now.**

> #### Consuming Content

- **IPFS client (dht client) want to consume ipfs://cid**
- **IPFS client consult local DHT table to see where this cid is located, gets bakc collection of IP address/ports**
- **if nothing comes back it will ask its peers**
- **client connects to some or all the peers that come back of the query to downlaod the content**
- **client donwloads chunks of content from each peer so its speeds up process**
- **once the client has the content, it updates its local DHT table with CID(if its support being a DHT server)**
- **new updated DHT is propagated across peers**



            
             A
            DHT
            ----
            CID1->(A,B)
            CID2->(A,C)
            CID3->(C)
            CONTENT
            -------
            CID1 CID2

            =========

             B
            DHT
            ----
            CID1->(A,B)
            CID2->(A,C)
            CID3->(C)
            CONTENT
            -------
            CID1

            ===========

             C
            DHT
            ----
            CID1->(A,B)
            CID2->(A,C)
            CID3->(C)
            CONTENT
            -------
            CID2 CID3















