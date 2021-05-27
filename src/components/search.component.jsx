import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/search.css";
import axios from "axios";
import Spells from "./spells.component.jsx";
import Classes from "./classes.component.jsx";
import Select from "react-select";
import Monsters from "./monsters.component.jsx";
import Races from "./races.component.jsx";
import Equipment from "./equipment.component.jsx";
import Skills from "./Skills.jsx";
import AbilityScores from "./AbilityScores.jsx";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "black" : "#ec2127",
    border: "solid 1px black",
    color: state.isFocused ? "white" : "black",
    letterSpacing: "2px",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "5px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black",
  }),
  container: (provided) => ({
    ...provided,
    marginBottom: "20px",
  }),
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.state = {
      category: "0",
      search: "",
      results: [],
      loading: false,
      message: "",
      data: {},
      isSpellsTrue: false,
      isClassesTrue: false,
      isMonstersTrue: false,
      isRacesTrue: false,
      isEquipmentTrue: false,
      isSkillsTrue: false,
      resultUrl: "",
      render: true,
      value: "",
    };
    this.cancel = "";
  }

  /**
   * Fetch the search results and update the state with the result.
   */
  fetchSearchResults = (category, search) => {
    const searchUrl = `https://www.dnd5eapi.co/api/${category}/?name=${search}`;
    console.log(searchUrl);

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
        const resultNotFoundMsg = !res.data.results.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.results,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results. Please check network",
          });
        }
        console.log(error);
      });
  };

  handleOnSearchInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(
      {
        [name]: value,
        loading: true,
        message: "",
        isSpellsTrue: false,
        isClassesTrue: false,
        isRacesTrue: false,
        isMonstersTrue: false,
        isEquipmentTrue: false,
        isSkillsTrue: false,
        isAbilityScoresTrue: false,
        render: true,
        category: this.state.category,
      },
      () => {
        this.fetchSearchResults(this.state.category, this.state.search);
      }
    );
  };

  handleOnInputChange = (selected) => {
    const value = selected.value;
    let name = selected.label;
    if (name.includes(" ")) {
      name = name.replace(" ", "-");
    }

    this.setState(
      {
        [value]: value,
        loading: true,
        message: "",
        isSpellsTrue: false,
        isClassesTrue: false,
        isMonstersTrue: false,
        isRacesTrue: false,
        isEquipmentTrue: false,
        isSkillsTrue: false,
        isAbilityScoresTrue: false,
        render: true,
        category: name,
      },
      () => {
        this.fetchSearchResults(this.state.category, this.state.search);
      }
    );
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      const spells = this.state.category === "Spells";
      const classes = this.state.category === "Classes";
      const monsters = this.state.category === "Monsters";
      const races = this.state.category === "Races";
      const equipment = this.state.category === "Equipment";
      const skills = this.state.category === "Skills";
      const abilityScores = this.state.category === "Ability-Scores";

      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <div key={result.index} className="result-items">
                <div className="desc-wrapper">
                  <h6 className="search-name">{result.name}</h6>
                  {(spells ||
                    classes ||
                    monsters ||
                    races ||
                    equipment ||
                    skills ||
                    abilityScores) && (
                    <button
                      onClick={() => {
                        this.setState({
                          resultUrl: result.url,
                          isSpellsTrue: spells,
                          isClassesTrue: classes,
                          isMonstersTrue: monsters,
                          isRacesTrue: races,
                          isEquipmentTrue: equipment,
                          isSkillsTrue: skills,
                          isAbilityScoresTrue: abilityScores,
                          render: false,
                        });
                        console.log(this.state);
                      }}
                    >
                      Read More
                    </button>
                  )}
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
      isMonstersTrue: false,
      isRacesTrue: false,
      isEquipmentTrue: false,
      isSkillsTrue: false,
      isAbilityScoresTrue: false,
    });
  };

  displayMore = () => {
    if (this.state.isSpellsTrue) {
      return <Spells url={this.state.resultUrl} />;
    } else if (this.state.isClassesTrue) {
      return <Classes url={this.state.resultUrl} />;
    } else if (this.state.isMonstersTrue) {
      return <Monsters url={this.state.resultUrl} />;
    } else if (this.state.isRacesTrue) {
      return <Races url={this.state.resultUrl} />;
    } else if (this.state.isEquipmentTrue) {
      return <Equipment url={this.state.resultUrl} />;
    } else if (this.state.isSkillsTrue) {
      return <Skills url={this.state.resultUrl} />;
    } else if (this.state.isAbilityScoresTrue) {
      return <AbilityScores url={this.state.resultUrl} />;
    }
  };

  render() {
    const { search } = this.state;
    const { message } = this.state;

    const options = [
      { value: "spells", label: "Spells" },
      { value: "classes", label: "Classes" },
      { value: "races", label: "Races" },
      { value: "monsters", label: "Monsters" },
      { value: "equipment", label: "Equipment" },
      { value: "skills", label: "Skills" },
      { value: "ability scores", label: "Ability Scores" },
      { value: "proficiencies", label: "Proficiencies" },
    ];

    return (
      <div className="search">
        <form>
          <label htmlFor="category">
            <Select
              className="category"
              name="category"
              options={options}
              onChange={this.handleOnInputChange}
              styles={customStyles}
            />
          </label>
          <label className="search-label" htmlFor="search">
            <input
              name="search"
              autoComplete="off"
              type="text"
              value={search}
              id="search-input"
              placeholder="Search..."
              onChange={this.handleOnSearchInputChange}
            />
            <FontAwesomeIcon className="search-icon" icon="search" />
          </label>
        </form>
        {!this.state.render && (
          <button onClick={this.toggleRender}>Go Back</button>
        )}

        <div>
          {this.state.render && <div>{this.renderSearchResults()}</div>}
        </div>

        <div>{this.displayMore()}</div>

        {/*Error Message*/}
        {message && <p className="message">{message}</p>}
      </div>
    );
  }
}
