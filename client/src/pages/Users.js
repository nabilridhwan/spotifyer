import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import { FaUser } from "react-icons/fa"

export default function Users() {

    const [users, setUsers] = useState([])
    const [displayUsers, setDisplayUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState(null)
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setUserLoaded(false);
            let users = await getUsers();
            setUsers(users)
            setDisplayUsers(users)
            setUserLoaded(true);
        })();
    }, [])

    useEffect(() => {

        (async () => {

            if (searchQuery) {
                let users = await getUsers(searchQuery)
                setDisplayUsers(users)
            } else {
                setDisplayUsers(users)
            }
        })();
    }, [searchQuery])

    async function getUsers(query = "") {
        let url = `/api/user`
        if (query) {
            url = `/api/user?q=${query}`
        }
        return await fetch(url)
            .then(res => res.json())
            .then(users => {
                return users
            })
    }

    return (
        <div className="">

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>Users</h1>
                <h3>Users of Musicn</h3>

                <p>Spotify account not linked? Click <Link className="underline" to="/error/4">here</Link> to find out more!</p>
            </div>

            {/* <div className="flex flex-wrap justify-center">
                <input type="text" className="mx-10 py-5 w-full md:w-1/2 border rounded-lg text-center" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for users" />
            </div> */}

            {userLoaded ? (
                displayUsers && displayUsers.length != 0 ? displayUsers.map((user, index) => (
                        <div className="user mx-5 md:w-3/4 md:mx-auto my-5 bg-white rounded-lg border border-black/15 transition ease-out duration-300 hover:scale-105 hover:drop-shadow-lg">
                    <a key={index} href={user.spotify_userid ? "/user/" + user.username : ""} className="w-full px-8 py-5 flex items-center">

                            {user.profile_pic_url ?
                                <img className="profile_picture rounded-full w-14 h-14 m-1" src={user.profile_pic_url} alt="profile picture" />
                                :
                                <div className="h-14 w-14 m-1 flex justify-center items-center bg-brand-color rounded-full">
                                    <FaUser className="fa fa-user text-lg text-center text-white/90" aria-hidden="true"></FaUser>
                                </div>
                            }

                            <div className="ml-5">
                                <p className="text-lg font-bold">{user.name && decodeURI(user.name)}</p>
                                <p className="text-sm text-black/50">
                                    @{user.username}
                                </p>

                                {!user.spotify_userid && (
                                    <p className="text-sm text-black/30">
                                        Spotify account not linked
                                    </p>
                                )}
                            </div>
                    </a>
                        </div>
                ))

                    :
                    (

                        <p className="text-center my-10">No users found!</p>
                    )

            ) : (

                <p className="text-center my-10">
                    Loading
                </p>
            )}



        </div>
    )
}