import { Link } from 'react-router-dom';

export function SignOut () {
    localStorage.removeItem('@natureza365:user');
  
    return(
        <>
           <div>
        <button onClick={SignOut}> 
            <Link to='/'>Home</Link> 
        </button>        
        </div>
        </>
    )

}