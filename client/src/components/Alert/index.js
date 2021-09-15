import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Alert({hideFunction, message}) {
    return (
        <div>
            <div className="text-white flex px-6 py-4 border-0 rounded relative mb-4 bg-red-700">
                <span className="text-xl inline-block mr-5 align-middle">
                    <FontAwesomeIcon icon={faExclamation} />
                </span>
                <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Failed: </b> {message}
                </span>
                <button onClick={hideFunction} className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                    <span>×</span>
                </button>
            </div>
        </div>
    )
}