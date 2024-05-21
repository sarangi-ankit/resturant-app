"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError]=useState("")
  const [loading, setLoading] = useState(false)
  
  

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (!email || !password) {
        setError("please fill all the required field")
        setLoading(false)
        return 
      }
      
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        }
      );
        if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="w-full max-w-md p-8 space-y-8 bg-custom-background rounded shadow-md">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-customColor">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-customColor">
            Or{' '}
            <a href="/register" className="font-medium text-white hover:text-blue-500">
              create a new account
            </a>
          </p>
          <p className="mt-2 text-center text-sm text-red-500">{ error}</p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm">
            <div>
              
              <input
                name="email"
                type="email"
                required
                className="bg-custom-gradient relative block w-full px-3 py-2 text-customColor rounded-b-md focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e:any)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              
              <input
                name="password"
                type="password"
                required
                className="mt-7 bg-custom-gradient relative block w-full px-3 py-2 text-customColor rounded-b-md focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e:any)=>setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-customColor">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-customColor hover:text-secondaryColor">
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-secondaryColor hover:bg-customColor border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-customColor"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-customColor bg-custom-gradient">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-6">
            <div>
              <button
                type="button"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-custom-gradient border border-transparent rounded-md group hover:bg-custom-background focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => signIn('google',{ callbackUrl: '/' })}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="800px"
                    height="800px"
                  >
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.19 0 5.55 1.23 7.19 2.62L34.54 8C31.25 5.07 27.06 3 21.99 3 13.53 3 6.73 7.65 4.02 14.64l6.84 5.28C12.18 16.19 17.72 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.4 24.52c0-1.72-.15-3.35-.42-4.95H24v9.41h12.9c-.57 3.02-2.28 5.58-4.88 7.31l6.45 5.28c3.77-3.46 6.03-8.58 6.03-15.05z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M4.02 14.64C2.61 18.26 2 22.02 2 26s.61 7.74 2.02 11.36l6.84-5.28C7.43 29.22 6 27.21 6 26s1.43-3.22 4.86-6.08L4.02 14.64z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 46c6.06 0 11.17-2.01 14.88-5.5l-6.45-5.28c-2.05 1.39-4.72 2.22-7.43 2.22-6.31 0-11.68-4.08-13.59-9.79l-6.84 5.28C6.73 40.35 13.53 45 21.99 45 27.06 45 31.25 42.93 34.54 40l-3.35-2.88c-1.64 1.39-3.99 2.62-7.19 2.62z"
                    />
                  </svg>
                </span>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




















// "use client"
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const Login = () => {
//   const route = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
  

//   const handleLoginSubmit = async (e: any) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         route.push("/")

//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again later.');
//     }
//   }
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         <form className="space-y-4" onSubmit={handleLoginSubmit}>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter your email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter your password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Login
//             </button>
//           </div>
//           <div className='text-center'>
//             <p>Don&apos;t have account..</p>
//             <Link href="/register"><span className='text-blue-600'>Register Now</span></Link>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default Login;
