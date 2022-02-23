import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/members'>Members</NavLink>
        </li>
      </ul>
    </nav>
  );
}
