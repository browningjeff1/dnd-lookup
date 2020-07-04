import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/search.css';
import axios from 'axios';
import Spells from './spells.component.jsx';
import Class from './classes.component.jsx';
import Select from 'react-select';




export default class Search extends Component {
    constructor(props) {
        super(props);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.state = {
            category: '0',
            search: '',
            results: [],
            loading: false,
            message: '',
            data: {},
            isSpellsTrue: false,
            isClassesTrue: false,
            resultUrl: '',
            render: true,
            
        };
        this.cancel = '';  
    }

    /**
    * Fetch the search results and update the state with the result.
    */
    fetchSearchResults = ( category, search ) => {
        const searchUrl = `https://www.dnd5eapi.co/api/${category}/?name=${search}`

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();
        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                console.log(res);
                const resultNotFoundMsg = !res.data.results.length ? 'There are no more search results. Please try a new search.' : '';
                this.setState({
                    results: res.data.results,
                    message: resultNotFoundMsg,
                    loading: false,
                });
                
            })
            .catch((error) => {
                if(axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch results. Please check network',
                    })
                }
                console.log(error);
            })
    }

    handleOnInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            loading: true,
            message: '',
            isSpellsTrue: false,
            isClassesTrue: false,
            render: true,
        },
        () => {
            const category = this.state.category;
            const search = this.state.search;
            this.fetchSearchResults(category, search);
        });   
    }
        
    renderSearchResults = () => {
        const {results} = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div key={result.index} className="result-items">
                                <h6 className="search-name">{result.name}</h6>
                                <div className="desc-wrapper">
                                    <button onClick={() => {
                                        if (this.state.category === 'spells') {
                                            this.setState({ resultUrl: result.url, isSpellsTrue: true,isClassesTrue: false, render: false, });
                                        } else if (this.state.category === 'classes') {
                                            this.setState({ resultUrl: result.url, isClassesTrue: true, isSpellsTrue: false, render: false, });
                                        }
                                    }}>Read More</button>
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    toggleRender = () => {
        this.setState({
            render: true,
            isClassesTrue: false,
            isSpellsTrue: false,
        })
    }

    

    render() {
        const { search } = this.state;
        const { category } = this.state;
        const { message } = this.state;

        const options = [
            {value: 'spells', label: 'Spells'},
            {value: 'classes', label: 'Classes'},
            {value: 'races', label: 'Races'},
            {value: 'monsters', label: 'Monsters'},       
        ];
        
        return (
           <div className="search">
                <form  onSubmit={this.handleSubmit}>
                    <label htmlFor="category">
                        <Select className="category" name="category" value={category} options={options} onChange={this.handleOnInputChange}/>
                        <select className="category" name="category" value={category} onChange={this.handleOnInputChange}>
                            <option value="0">Select category: </option>
                            <option value="spells">Spells</option>
                            <option value="classes">Classes</option>
                            <option value="races">Races</option>
                            <option value="monsters">Monsters</option>
                        </select>
                    </label>
                    <label className="search-label" htmlFor="search">
                        <input name="search" type="text" value={search} id="search-input" placeholder="Search..." onChange={this.handleOnInputChange} />
                        <FontAwesomeIcon className="search-icon" icon="search" />
                    </label>
                </form>
                <button onClick={this.toggleRender}>Go Back</button>

                <div>
                    {this.state.render &&
                        <div>
                            { this.renderSearchResults() }
                        </div>
                    }
                </div>
                
                <div>
                    { this.state.isSpellsTrue &&
                        <div>
                            <Spells url={this.state.resultUrl} />
                        </div>     
                    }
                </div>

                <div>
                    { this.state.isClassesTrue &&
                        <div>
                            <Class  url={this.state.resultUrl} />
                        </div>     
                    }
                </div>
                
                {/*Error Message*/}
                { message && <p className="message">{message}</p> } 
           </div> 
        )
    }
}