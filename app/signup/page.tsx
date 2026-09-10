import { signup } from "@/utils/services/signup";

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignupPage({
  searchParams,
}: SignupPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-600 sm:px-6 lg:px-8">
      <form className="w-90 rounded-lg bg-gray-100 p-8">

        <div className="flex justify-center items-center mb-6">
          <h1 className="text-xl font-bold">Sign Up</h1>
        </div>

        {params.error && (
          <p className="mb-4 text-center text-red-600">
            {params.error}
          </p>
        )}

        <div className="flex flex-col">

          <label
            className="block text-md font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email:
          </label>

          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />

          <label
            className="block text-md font-medium text-gray-700 mb-1 mt-5"
            htmlFor="password"
          >
            Password:
          </label>

          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />

          <label
            className="block text-md font-medium text-gray-700 mb-1 mt-5"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>

          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600 mb-5"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />

          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            formAction={signup}
            type="submit"
          >
            Sign Up
          </button>

          <div className="flex justify-center items-center mt-5">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-teal-500 hover:text-teal-600"
              >
                Log in
              </a>
            </p>
          </div>

        </div>
      </form>
    </div>
  );
}
