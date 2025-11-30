import React from 'react'
import { useState } from 'react'
import './Gith.css'
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingsFill } from "react-icons/pi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Gith = () => {
    const [errors, seterror] = useState(null)
    const [profileData, setprofileData] = useState()
    const [userName, setusername] = useState()
    const [createdat, setcreatedat] = useState()


    const handleInput = (e) => {
        e.preventDefault();
        setusername(e.target.value)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if (!userName || userName.length < 2) {
            alert("Enter correct username")
        }
        try {
            const response = await fetch(`https://api.github.com/users/${userName.toLowerCase()}`)
            if (!response.ok) throw new Error(`User not found: ${response.status}`);
            const data = await response.json();
            setprofileData(data);
            setcreatedat(data.created_at);
            seterror(null);
        } catch (error) {
            seterror(error)
            setprofileData(null);
            setcreatedat(null);
        }
    }
    return (
        <>
            <h1 className='heading'>GitHub Profile Finder</h1>

            <div className="container">
                <form onSubmit={handleClick}>
                <div className="search">
                    <input type="text" placeholder='Enter Githhub Username...' value={userName} onChange={handleInput} />
                    <button type='submit' onClick={handleClick}>Search</button>
                
                </div>
                </form>
                <div className="box">
                    {errors && (<p>{errors.message}</p>)}
                    {profileData && (<>
                        <div className="upperinfo">
                            <div className="image"><img src={profileData.avatar_url} alt="" /></div>
                            <div className="username">{profileData.name}</div>
                            <div className="joined">Joined:{createdat ? createdat.slice(0, 10).split("-").reverse().join("-") : '\u00A0'}</div>
                            <div className="name"> <a target='_blank' href={`https://github.com/${userName}`}>{profileData.login}</a></div>
 <div className="bio">{profileData.bio}</div>
                        </div>
                        <div className="lowerinfo">
                            <div className="repository">{profileData.public_repos}
                                <p>Repositories</p>
                            </div>
                            <div className="followers">{profileData.followers}
                                <p>Followers</p>
                            </div>
                            <div className="following">{profileData.following}
                                <p>Following</p>
                            </div>

                        </div>
                        <div className="personinfo">
                            <div className="location"><FaLocationDot />{profileData.location}</div>
                            <div className="workingcompany"><PiBuildingsFill />{profileData.company}</div>
                            <div className="email"><MdOutlineMarkEmailUnread />{profileData.email}</div>
                            <div className="id">
                            <div className="twitterid"> <a  target='_blank' href={`https://twitter.com/${profileData.twitter_username}`}><FaTwitter />Twitter</a></div>
                            <div className="gitid">  <a target='_blank' href={profileData.html_url}> <FaGithub />Visit Pofile</a></div>
                            </div>
                        </div>
                    </>)}


                </div>
            </div>

        </>
    )
}

export default Gith
