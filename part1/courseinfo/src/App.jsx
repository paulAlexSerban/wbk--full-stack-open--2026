import data from './data';

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {


  return (
    <div>
      <Header title={data.course} />
      <Content parts={data.parts} />
      <Total parts={data.parts} />
    </div>
  );
};

export default App;
