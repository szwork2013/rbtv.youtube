import {CollectionView} from 'backbone.marionette'
import {PlaylistItem} from '../../playlistsDetails/views/PlistlistItems'
import {props} from '../../decorators'

class RelatedResults extends CollectionView {
    @props({
        className: 'playlist-items related-items',

        childView: PlaylistItem
    })

    initialize() {

    }
}

export default RelatedResults