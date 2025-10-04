'use client';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { AkarIconsXFill } from "../icons/AkarIconsXFill";
import { BxBxlTelegram } from "../icons/BxBxlTelegram";
import { DocumentOnePageMultiple24Filled } from "../icons/DocumentOnePageMultiple24Filled";
import  Dexscreener from "../icons/dexscreener.svg";
import DextoolsSeeklogo from "../icons/DextoolsSeeklogo";
import Link from 'next/link';
import Image from 'next/image';
import { MdContentCopy } from "react-icons/md";
import { Button, message } from 'antd';
import { Paper} from "../icons/paper";
import { Pixelify_Sans, Rubik_Pixels } from "next/font/google";

const aboutus  = [
    { label: 'Twitter', link: 'https://x.com/cemeteryofcoins' },
    { label: 'Telegram Group', link: '/' },
    
];


const chart = [
    { label: 'Four meme', link: '/' },
    { label: 'Dexscreener', link: '/' },
    
];
const rubikPixels = Rubik_Pixels({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-rubikpixels",
  });
  const pixelify = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-pixelify",
  });




export default function Footer() {
    return (
        

        <motion.section
            className="container-lg overflow-hidden footer position-relative"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
        >

        
        
            
            <main className='row mt-5 mb-3 pb-5'>
                
                <motion.div
                    className='mb-3 mb-md-0 col-sm-12 col-md-4 d-md-block d-flex justify-content-md-start align-items-start'
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/icon.png" alt="Logo" width={70} height={70}  priority />
                    <p className={styles.name}>CEMENTRY OF COIN</p>
                </motion.div>

                <div className='col-6 col-sm-6 col-md-4 ps-4 ps-md-0' >
                    <motion.div
                        className={`d-flex flex-column align-items-md-start align-items-sm-center justify-content-center ${styles.footerLinks}`}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        
                        <h1>About us</h1>
                        {aboutus.map((item, i) => <Link key={i} href={item.link}>{item.label}</Link>)}
                    </motion.div>
                </div>

                

                <div className='col-6 col-sm-6 col-md-4 ps-4 ps-md-0'>
                    <motion.div
                        className={`d-flex flex-column align-items-md-start align-items-sm-center justify-content-center ${styles.footerLinks}`}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h1>Chart</h1>
                        {chart.map((item, i) => <Link key={i} href={item.link}>{item.label}</Link>)}
                    </motion.div>
                </div>

              {/*  <div className=' col-sm-12 col-md-3 mt-3 mt-md-0 ps-4 ps-md-0'>
                    <motion.div
                        className={`d-flex flex-column align-items-start justify-content-center ${styles.footerLinks}`}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h1>dApp</h1>
                        <button className={styles.btn}><span>Launch Now</span></button>
                    </motion.div>
                </div>*/}
            </main>
            <ContractAddress/>
            <CopyRight />
            <MadeBy />
        </motion.section>
    );
}
function MadeBy() {

    return (
        <div>
            <p style={{ fontSize: "13px", textAlign: "right", marginBottom: "15px", color: "rgba(255, 255, 255, 0.35)" }}>
                Product Designed and Created by <Link href="http://www.uxearch.com" style={{ textDecoration: 'underline' }}>Uxearch</Link>
            </p>
        </div>
    )
}
function ContractAddress() {
    const [messageApi, contextHolder] = message.useMessage();
    const address = 'coming soon'; // The address you want to copy

    const handleCopy = () => {
        navigator.clipboard.writeText(address)
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Address copied to clipboard!',
                    className: 'alert-class',
                    duration: 1,
                    style: {
                        zIndex: 99,
                    },
                });
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

    return (
        <div className={styles['contract-address']}>
            {contextHolder}
            <h1>Contract Address</h1>

            {/*             <input placeholder='Contract Address...' defaultValue='Coming Soon'/> */}
            <p onClick={handleCopy} className={styles['address']}>
                {address}
                <MdContentCopy style={{ cursor: 'pointer', height: '20px', width: '20px', marginLeft: '10px' }} />

            </p>

        </div>
    )
}
function CopyRight() {
    return (
        <motion.div
            className={`${styles.CopyRight} d-flex justify-content-between align-items-center py-3 px-sm-2 `}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
        >
            <p>
  &copy; 2025 All rights Reserved
  <span className={styles.mobileBreak}><br /></span>
  Cemetery of Coins.
</p>
            <div className={`d-flex align-items-center justify-content-end  ${styles.icons}`}>
            <a href="#" target="_blank" rel="noopener noreferrer">
  <Image src={Dexscreener} alt="Dexscreener" width={24} height={24} className={styles.icon} />
</a> 
                <Link href='https://x.com/cemeteryofcoins' target="_blank" ><AkarIconsXFill className={styles.icon} /></Link>
                <Link href="#" target="_blank"><BxBxlTelegram className={`${styles.icon}`} /></Link>
                

                <Link href="#" target="_blank"><Paper className={`${styles.icon} `} /></Link>
                
            </div>
        </motion.div>
    );
}
