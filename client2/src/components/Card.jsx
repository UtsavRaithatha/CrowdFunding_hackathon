// import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers';
// import { use } from 'chai';

export default function Card({ owner, title, image, target, deadline, description }) {

    const startPayment = async ({ setTxs, ether, addr }) => {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress(addr);
        const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether)
        });
        console.log({ ether, addr });
        console.log("tx", tx);
        setTxs([tx]);
    };

    const [txs, setTxs] = useState([]);
    const [data, setData] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError();
        await startPayment({
            setTxs,
            ether: data,
            addr: owner
        });
    };

    return (
        <div className="card">
            <img src={image} alt className="card-img-top" />
            <div className="card-body">
                <h3 className="card-title d-flex justify-content-center my-2">{title}</h3>
                <p className="card-text">{description}</p>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="d-flex flex-column align-items-center">
                                <p class="card-text"><b>Owner: </b> {owner}</p>
                                <p class="card-text"><b>Target: </b> {target}</p>
                                <p class="card-text"><b>Deadline: </b> {deadline}</p>
                                <div className="my-3">
                                    <input
                                        name="ether"
                                        type="text"
                                        placeholder="Amount in ETH"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                </div>
                                <Link to="" className="btn btn-dark" onClick={handleSubmit} >Donate</Link>
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
