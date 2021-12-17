

export default function clickReducer(
    state = 0, action
) {
    if (action.type === 'boardClick' && action.board !== action.playing && !action.hit) {
        return state + 1;
    }
    if (action.type === 'RESET') {
        return 0;
    }
    return state;
}