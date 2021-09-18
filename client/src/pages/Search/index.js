import { useState } from "react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { DEEP_SEARCH } from "../../utils/queries"
import { Hint } from 'react-autocomplete-hint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dateFormat from "../../utils/dateFormat";

import Alert from '../../components/Alert';

export default function SearchPage() {

  const [search, setSearch] = useState({ title: "", author: "", tags: [] })
  const [tagText, setTagText] = useState("")
  const [input, setInput] = useState({})

  const [alert, setAlert] = useState({ show: false, message: "" })

  async function handleSearchSubmit() {
    setInput(search)
  }
    
    function TagsList({tags, deletable}) {
        return(
            <div className="grid grid-cols-3 w-full gap-2 flex-grow-0">
            {tags.length ? tags.map(tag => {
                return (
                    <div className="p-1 overflow-x-hidden max-w-sm rounded-xl h-7 text-sm bg-theme-berry text-white flex justify-between">
                        <span className="max-w-sm">{tag}</span>
                        {deletable ?
                        <div onClick={() => deleteTag(tag)} className="transition duration-100 hover:text-red-700 cursor-pointer px-1">
                            <span><FontAwesomeIcon icon={faTimes} /></span>
                        </div>
                        : null
                        }
                    </div>
                )
            }) : null}
        </div>
         )
        }

  function SearchResults() {
    const renderData = (data) => {
      return (
        <>
          {data.map(result => {
            return (
              <div className="rounded w-full p-3 bg-theme-main lg:flex space-y-4 lg:space-y-0 justify-between">
                <div className="w-1/2">
                  <p className="text-xl font-semibold text-white">{result.title}<span className="text-black ml-1 text-sm font-normal"> -{result.author}</span></p>
                  <p className="text-xs mt-3">Created {dateFormat(result.createdAt)}</p>
                </div>
                <div className="container rounded bg-theme-aliceblue p-3 w-full">
                  <span>{result.description}</span>
                </div>
                <div className="w-3/4 px-5">
                  <TagsList tags={result.tags} deletable={false} />
                </div>
                <div className="w-2/6 flex items-center justify-center">
                  <Link to={`/quiz/${result._id}`}>
                    <button className="p-2 rounded bg-green-400 hover:bg-green-600 transition duration-200">Go to Quiz</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </>
      )
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const pages = [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const { loading, data, error } = useQuery(DEEP_SEARCH, {
      variables: {
        input: {
          ...input
        }
      }
    });

    let deepSearchData = data?.deepSearch || [];

    for (let i = 0; i < Math.ceil(deepSearchData.length/itemsPerPage); i++) {
      pages.push(i + 1);
    };

    const currentItems = deepSearchData.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(n => {
      return (
        <div className='cursor-pointer'>
          <li 
            className={currentPage == n ? 'bg-theme-darker rounded' : 'null'}
            style={{
              padding: '0.25rem'
            }}
            key={n} 
            id={n}
            onClick={handleClick}
          >
            {n}
          </li>
        </div>
      );
    });

    function handleClick(event) {
      setCurrentPage(Number(event.target.id));
    };
  
    function handlePrevBtn() {
      setCurrentPage(currentPage - 1);
    };
  
    function handleNextBtn() {
      setCurrentPage(currentPage + 1);
    };

    if (loading) {
      return (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
        </div>
      )
    }

    if (error) {
      return (
        <span>{error}</span>
      )
    };

    return (
      <div className="space-y-2 md:px-10">
        {deepSearchData.length ? (
          <>
            {renderData(currentItems)}
            <ul className='flex flex-wrap list-none'>
              <li key='prevbtn' className='p-1'>
                <button
                  onClick={handlePrevBtn}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </li>
              {deepSearchData.length > 8 ? renderPageNumbers : null}
              <li key='nextbtn' className='p-1'>
                <button
                  onClick={handleNextBtn}
                  disabled={currentPage == pages[pages.length - 1] ? true : false}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </li>
            </ul>
          </>
        ) : (
          <span className='italic'>No Results Found</span>
        )}
      </div>
    )
  }

  function handleTagSubmit() {
    const newTags = search.tags
    if (newTags.length < 5) {
      if (tagText.length < 13) {
        newTags.push(tagText)
        setSearch({ ...search, tags: newTags })
      }
      else {
        setAlert({ show: true, message: "Maximum tag length is 12 characters!" })
      }
    }
    else {
      setAlert({ show: true, message: "Maximum allowed tags is 5!" })
    }
    setTagText("")
  }

  function handleTagInputEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleTagSubmit()
    }
  }

  function deleteTag(tag) {
    const newTags = search.tags
    const delIndex = newTags.indexOf(tag)
    newTags.splice(delIndex, 1)
    setSearch({ ...search, tags: newTags })
  }

  const tags = [
    "Programming",
    "Javascript",
    "Node",
    "MySQL",
    "CSS",
    "React",
    "MongoDB",
    "WebDev",
    "HTML",
    "Movies",
    "Television",
    "Math",
    "History",
    "Science",
    "Geography"
  ]

  return (
    <div className='min-h-screen flex bg-theme-lighter'>
      <div className="bg-theme-bluegray border-2 md:border-4 border-theme-main mt-20 w-full rounded shadow-lg p-5 m-5">
        <h2 className="text-4xl font-title text-white mb-5">Search</h2>
        <div className="rounded bg-theme-aliceblue p-5">
          <div className="flex flex-wrap w-full justify-between">
            <div>
              <input className="bg-theme-aliceblue rounded-lg" type="text" value={search.title} placeholder="Title" onChange={(e) => setSearch({ ...search, title: e.target.value })} />
            </div>
            <div>
              <input className="bg-theme-aliceblue rounded-lg" type="text" value={search.author} placeholder="Author" onChange={(e) => setSearch({ ...search, author: e.target.value })} />
            </div>
            <div className="flex justify-between gap-2">
              <Hint options={tags} allowTabFill>
                <input className="bg-theme-aliceblue rounded-lg"
                  value={tagText}
                  type="text"
                  placeholder="Add tags..."
                  onChange={e => setTagText(e.target.value)}
                  onKeyDown={e => handleTagInputEnter(e)}
                />
              </Hint>
              {search.tags.length ?
                <TagsList tags={search.tags} deletable={true} />
                : null}
            </div>
            <button className="bg-blue-600 hover:bg-blue-800 transition duration-200 rounded p-2 text-white" onClick={() => handleSearchSubmit()}>Submit Search</button>
          </div>
          {alert.show ?
            <div className="mt-8">
              <Alert message={alert.message} hideFunction={() => setAlert({ show: false, message: "" })} />
            </div>
            : null}
        </div>
        <div className="bg-theme-aliceblue rounded p-5 mt-2">
          <SearchResults />
        </div>
      </div>
    </div>
  )
}