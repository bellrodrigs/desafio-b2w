import Enzyme, { configure, mount, shallow, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new EnzymeAdapter() });

export {mount, shallow, render}
export default Enzyme;