import React from "react"
import ModeSwitch from "../components/ThemeSwitch"

const Header = () => {
	return (
		<div className='m-auto mt-2 w-[95%] max-w-[1400px] h-[48px] border-2 background flex flex-row items-center justify-between p-2 rounded-lg'>
            <h1>Zametki</h1>
			<ModeSwitch/>
		</div>
	)
}

export default Header
