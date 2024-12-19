import React from 'react'
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';

function NavbarComponent() {
    return (
        <Navbar fluid rounded className='border-b'>
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Suraksha Kendra</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/">Login</Navbar.Link>
                <Navbar.Link href="/map">Map</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent