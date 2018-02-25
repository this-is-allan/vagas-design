import _ from "lodash";
import { FETCH_JOBS } from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_JOBS:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}