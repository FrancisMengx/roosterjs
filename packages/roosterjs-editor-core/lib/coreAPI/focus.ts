import EditorCore, { Focus } from '../interfaces/EditorCore';
import { createRange, getFirstLeafNode } from 'roosterjs-editor-dom';
import { PositionType } from 'roosterjs-editor-types';

const focus: Focus = (core: EditorCore) => {
    let range = core.cachedSelectionRange;
    let skipSameRange = !core.corePlugins.domEvent.selectCachedRangeWhenFocus;

    if (!range || !core.api.selectRange(core, range, skipSameRange)) {
        let node = getFirstLeafNode(core.contentDiv) || core.contentDiv;
        core.api.selectRange(core, createRange(node, PositionType.Begin), skipSameRange);
    }
    // This is more a fallback to ensure editor gets focus if it didn't manage to move focus to editor
    if (!core.api.hasFocus(core)) {
        core.contentDiv.focus();
    }
};

export default focus;
