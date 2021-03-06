import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link, useStaticQuery, graphql} from 'gatsby'

import '../css/header.css'
import logo from '../images/hashtagcoder-icon.png'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faTwitter, 
  faInstagram, 
  faLinkedin, 
  faGithub,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const socialIconsMap = {
  twitter: faTwitter,
  instagram: faInstagram,
  linkedin: faLinkedin,
  github: faGithub,
  youtube: faYoutube
}

const Header = ({siteTitle}) => {
  const data = useStaticQuery(graphql`
    {
      appConfig {
        socialLinks {
          href
          icon
        }
        navigation {
          value
          page
          href
          active
        }
      }
    }
  `)

  const [showNav, setShowNav] = useState(false)
  const [navAnimation, setNavAnimation] = useState('fadeInRight')

  const toggleShowNav = () => {
    let animation = 'fadeIn'
    let timeout = 100

    if (showNav) {
      animation = 'fadeOut'
      timeout = 500
    } else {
      animation = 'fadeIn'
      timeout = 100
    }
    
    setNavAnimation(animation)
    setTimeout(() => setShowNav(!showNav), timeout)
  }

  return (
    <div className="absolute top-0 z-10 w-full">
    <header className="p-2 sm:p-8 sm:flex justify-between items-center">
      <div className="mb-3 sm:mb-0 flex justify-between items-center">
        <div className="text-2xl sm:text-3xl m-0">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-10 mr-1" />
            {siteTitle}
          </Link>
        </div>

        <div className="sm:hidden">
          <button type="button" 
            className="hover:text-gray-500 focus:text-gray-500 focus:outline-none"
            onClick={() => toggleShowNav()}>
            <FontAwesomeIcon icon={showNav ? faTimes : faBars} />
          </button>
        </div>
      </div>

      <ul className={`navigation bg-gray-200 rounded sm:bg-white p-2 sm:p-0 sm:flex animated ${navAnimation} ${showNav ? 'relative' : 'hidden'}`}>
        {data.appConfig.navigation.filter(x => x.active).map(link => (
          <li className="mb-2 sm:mb-0" key={link.page}>
            <Link to={`/${link.href}`} 
              className="hoverable" 
              activeClassName="border-b border-dashed">
              {link.value}
            </Link>
          </li>
        ))}

        <div className="flex">
          {data.appConfig.socialLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} 
                target="_blank"
                rel="noopener noreferrer">
                <FontAwesomeIcon icon={socialIconsMap[link.icon]} />
              </a>
            </li>
          ))}
        </div>
      </ul>
    </header>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
