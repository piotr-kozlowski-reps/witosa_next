import { signOut } from 'next-auth/react';

export default function Navbar() {
  const signOutHandler = () => {
    console.log('signOut');
    signOut();
  };

  return (
    <nav className="flex items-center justify-between h-32 px-8 bg-skin-fill">
      <div>1</div>
      <div>2</div>
      {/* <div className="p-3 bg-skin-fill-inverted text-skin-inverted">logo</div>
      <div className="flex items-center justify-center gap-1">
        <div className="p-2 text-base rounded-md bg-skin-fill-inverted text-skin-inverted">
          o nas
        </div>
        <div className="p-2 text-base rounded-md bg-skin-fill-inverted text-skin-inverted">
          admin
        </div>
        <button
          className="p-2 text-base rounded-md bg-skin-fill-inverted text-skin-inverted"
          type="button"
          onClick={signOutHandler}
        >
          signOut
        </button>
      </div> */}
    </nav>
  );
}
