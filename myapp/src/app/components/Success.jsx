function Success({success}) {

  return (
    <>
    <div>{success ? <div className='text-white font-extrabold bg-blue-500 p-5 rounded-md'>SUCCESSFULLY ADDED PLAYER</div> : <div></div>}</div>
    <div>{!success ? <div className='text-white font-extrabold bg-blue-500 p-5 rounded-md'>ERROR: YOU DO NOT HAVE ENOUGH CREDIT OR TOO MANY PLAYERS</div> : <div></div>}</div>
    </>
  )
}

export default Success