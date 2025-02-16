// OptionsPage.tsx
import React from 'react';
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
  //     <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
  //     <p>
  //       <button onClick={() => clerk.signOut()}>Sign out</button>
  //     </p>
  //   </>
  // );
  return <UserButton />;
}


const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

function ClerkProviderforOptions() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={publishableKey} navigate={(to) => navigate(to)}>
      <div className="App">
        <header className="App-header">
          <div>Options of SavePage</div>
          {/* <a
            className="App-link"
            href="https://clerk.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Clerk
          </a> */}
        </header>
        <main className="App-main">
          <Routes>
            <Route
              path="/sign-up/*"
              element={<SignUp signInUrl="/" />}
            />
            <Route path='/' element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/options.html" signUpUrl="/sign-up" />
                </SignedOut>
              </>
            } />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  );
}

function OptionsPage() {
  return (
    <MemoryRouter>
      <ClerkProviderforOptions />
    </MemoryRouter>
  );
}

export default OptionsPage;