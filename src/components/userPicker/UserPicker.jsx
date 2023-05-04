import { InputPicker } from 'rsuite';

function UserPicker({ users }) {
    const data = [
        "--",
        'Eugenia',
        'Bryan',
        'Linda',
        'Nancy',
        'Lloyd',
        'Alice',
        'Julia',
        'Albert',
        'Louisa',
        'Lester',
        'Lola',
        'Lydia',
        'Hal',
        'Hannah',
        'Harriet',
        'Hattie',
        'Hazel',
        'Hilda'
    ].map(item => ({ label: item, value: item }));
    return (
        <InputPicker data={data} style={{ margin: 20 }} block />
    );
}

export default UserPicker;