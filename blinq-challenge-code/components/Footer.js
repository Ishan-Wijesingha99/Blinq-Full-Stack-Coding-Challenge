import React from 'react'
import appStoreImg from  '../public/app-store.webp'
import goooglePlayImg from '../public/google-play.webp'
import SOCImg from '../public/soc-2-certified.webp'
import Image from 'next/image'
import footerLogo from '../public/footer-logo.png'
import Link from 'next/link'



export default function Footer() {
  return (
    <div className='footer-container'>

      <div className='footer-download-links'>

        <div className='download-links-left'>
          <Link href='/'>
            <Image
            src={footerLogo}
            width={90}
            height={27}
            />
          </Link>
        </div>

        <div className='download-links-right'>

          <Link
          href="https://apps.apple.com/app/id1324102258"
          passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className='download-img-wrapper'>
                <Image
                src={appStoreImg}
                width={130}
                height={40}
                />
              </div>
            </a>
          </Link>
          
          <Link
          href="https://play.google.com/store/apps/details?id=com.rabbl.blinq"
          passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className='download-img-wrapper'>
                <Image
                src={goooglePlayImg}
                width={130}
                height={40}
                />
              </div>
            </a>
          </Link>

          <Link
          href="https://app.vanta.com/blinq/trust/wywxgtvmdkpf4v8wmskgd1"
          passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className='download-img-wrapper'>
                <Image
                src={SOCImg}
                width={130}
                height={56}
                />
              </div>
            </a>
          </Link>

        </div>
        
      </div>

      <div className='rights-reserved'>
        <p>© 2017-2023 Blinq Technologies Pty Ltd. All Rights Reserved.</p>
      </div>

      <div className='social-media-icons'>
        <Link href='https://www.instagram.com/blinq.app/' passHref>
          <a target="_blank" rel="noopener noreferrer">
            <i
            className="fa-brands fa-instagram social-footer-icon"
            style={{color: 'rgba(255,255,255,0.8)'}}
            ></i>
          </a>
        </Link>

        <Link href='https://www.youtube.com/channel/UCopwKOpWolEHxJONR5ZVjMQ' passHref>
          <a target="_blank" rel="noopener noreferrer">
            <i
            className="fa-brands fa-youtube social-footer-icon"
            style={{color: 'rgba(255,255,255,0.8)'}}
            ></i>
          </a>
        </Link>
        
        <Link href='https://www.facebook.com/blinqtechnologies' passHref>
          <a target="_blank" rel="noopener noreferrer">
            <i
            className="fa-brands fa-facebook-f social-footer-icon"
            style={{color: 'rgba(255,255,255,0.8)'}}
            ></i>
          </a>
        </Link>

        <Link href='https://www.linkedin.com/company/blinq-me/' passHref>
          <a target="_blank" rel="noopener noreferrer">
            <i
            className="fa-brands fa-linkedin social-footer-icon"
            style={{color: 'rgba(255,255,255,0.8)'}}
            ></i>
          </a>
        </Link>
      </div>
    </div>
  )
}
