/*import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"

const SignUp = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter the name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    // SignUp API call
    try {
      // Upload profile picture if present
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic)
        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/auth/sign-up", {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminJoinCode: adminInviteToken,
      })

      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again!")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Gradient top border */
          /*<div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">
            {/* Logo and title */
            /*<div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPeopleGroup className="text-4xl text-blue-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                Join Project Flow
              </h1>

              <p className="text-gray-600 mt-1">
                Start managing your projects efficiently
              </p>
            </div>

            {/* Login Form */
            /*<form onSubmit={handleSubmit} className="space-y-6">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Invite Token
                </label>

                <div className="relative">
                  <input
                    id="adminInviteTokem"
                    type={showAdminInviteToken ? "text" : "password"}
                    value={adminInviteToken}
                    onChange={(e) => setAdminInviteToken(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setShowAdminInviteToken(!showAdminInviteToken)
                    }
                  >
                    {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer uppercase"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an accout?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp*/


/*import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"

const SignUp = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter the name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic)
        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/auth/sign-up", {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminJoinCode: adminInviteToken,
      })

      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again!")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a]/95 backdrop-blur-md border border-green-500 rounded-2xl shadow-2xl overflow-hidden">

          {/* Top Border */
          /*<div className="h-2 bg-gradient-to-r from-green-500 to-emerald-700"></div>

          <div className="p-8">

            {/* Logo & Title */
            /*<div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-green-500/20 border border-green-500 p-4 rounded-full">
                  <FaPeopleGroup className="text-4xl text-green-400" />
                </div>
              </div>

              <h1 className="text-3xl font-extrabold text-green-400 mt-4 uppercase tracking-widest">
                TaskNova
              </h1>
            </div>

            {/* Form */
            /*<form onSubmit={handleSubmit} className="space-y-5">

              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />

              {/* Full Name */
              /*<div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              {/* Email */
              /*<div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password */
              /*<div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Admin Token */
              /*<div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Admin Invite Token
                </label>

                <div className="relative">
                  <input
                    type={showAdminInviteToken ? "text" : "password"}
                    value={adminInviteToken}
                    onChange={(e) => setAdminInviteToken(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-400"
                    onClick={() =>
                      setShowAdminInviteToken(!showAdminInviteToken)
                    }
                  >
                    {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Error */
              /*{error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* Button */
              /*<div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-bold uppercase shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login Link */
            /*<div className="mt-6 text-center text-sm">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-green-400 font-semibold hover:text-green-300"
                >
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp*/



import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"

const SignUp = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter the name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic)
        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/auth/sign-up", {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminJoinCode: adminInviteToken,
      })

      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again!")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        
        <div className="bg-[#1a1a1a]/95 border border-green-500 rounded-2xl shadow-2xl overflow-hidden">

          {/* Top Border */}
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-700"></div>

          <div className="p-8">

            {/* Logo */}
            <div className="text-center mb-8">
              
              <div className="flex justify-center">
                <div className="bg-green-500/20 p-4 rounded-full border border-green-500">
                  <FaPeopleGroup className="text-4xl text-green-400" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-green-400 mt-4 uppercase tracking-wider">
                TaskNova
              </h1>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Admin Token */}
              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Admin Invite Token
                </label>

                <div className="relative">
                  <input
                    type={showAdminInviteToken ? "text" : "password"}
                    value={adminInviteToken}
                    onChange={(e) => setAdminInviteToken(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-green-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-400"
                    onClick={() =>
                      setShowAdminInviteToken(!showAdminInviteToken)
                    }
                  >
                    {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-bold uppercase shadow-lg"
              >
                Sign Up
              </button>

            </form>

            {/* Login */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp