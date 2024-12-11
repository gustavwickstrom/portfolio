'use client'


const Button = ({data, children})=>{


    const handleClick = ()=>{
        alert('yo')
    }

    return (
        <div className="px-4 py-2 bg-[blue]" onClick={handleClick}>
            {children}
        </div>
    )
}

export default Button;