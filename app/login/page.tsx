
import { login } from "@/utils/services/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-600 sm:px-6 lg:px-8">
      <form className="absolute h-100 w-90 rounded-lg bg-gray-100">
            <div className="flex justify-center items-center m-4" >
                <h1 className="text-xl justify-center">Login</h1>
            </div>

            <div className="flex flex-col m-8">
                      
          <label className="block text-md font-medium text-gray-700 mb-1" htmlFor="email">Email:</label>
          <input className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600" id="email" name="email" type="email" placeholder="Enter email" required />
        
        <div>
          <label className="block text-md font-medium text-gray-700 mb-1 mt-5" htmlFor="password">Password:</label>
          <input className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600 mb-5" id="password" name="password" type="password" placeholder="Enter password" required />
        </div>
        
   

        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" formAction={login} type="submit">
          Sign In
        </button>     
        <div className="flex justify-center items-center m-4" >
            <p>Don't have an account? <a href="/signup" className="text-teal-500 hover:text-teal-600">Sign up</a></p>
        </div> 
        </div>
      </form>
    </div>
  )
}
