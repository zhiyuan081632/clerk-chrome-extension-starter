import "./App.css";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
  UserButton,
} from "@clerk/chrome-extension";
import {
  useNavigate,
  Routes,
  Route,
  MemoryRouter
} from "react-router-dom";

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isSignedIn) {
    return null;
  }

  // return (
  //   <>
  //     {/* <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p> */}
  //     <p>
  //       <button onClick={() => clerk.signOut()}>Sign out</button>
  //     </p>
  //   </>
  // );
  return <UserButton />
}


const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={publishableKey} navigate={(to) => navigate(to)}>
      <div className="App">
        <header className="App-header">
          <p>Welcome to SavePage Extension!</p>
          {/* <a
            className="App-link"
            href="https://clerk.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Clerk
          </a> */}
        </header>
        {/* <WindowSize /> */}
        <main className="App-main">
          <Routes>
            <Route
              path="/sign-up/*"
              element={<SignUp signInUrl="/" />}
            />
            <Route path='/' element={
              <>
                <SignedIn>
                  <div className="hello-user-container">
                    <HelloUser />
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
                </SignedOut>
              </>
            } />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  );
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;
