import { useAuth } from './Auth'
import { Link } from 'react-router-dom';
import './LeftBar.css'

function LeftBar() {
    const { authUser, userSignOut } = useAuth();

    return (
        <div className='leftbar-container'>
            <Link className="leftLink" to='/'>Home</Link>
            <Link className="leftLink" to='/add-task'>Add Task</Link>
            <Link className="leftLink" to='/all-tasks'>All Tasks</Link>
            
            <div className="bottom">
                {authUser ? (
                    <Link className="leftLink" onClick={userSignOut}>Sign Out</Link>
                ) : (
                    <Link className="leftLink" to="/login">Login</Link>
                )}
            </div>
        </div>
    )
}

export default LeftBar