import $ from 'jquery'
import _ from 'underscore'
import {CompositeView, ItemView} from 'backbone.marionette'
import {Model} from 'backbone'
import {props} from '../../decorators'

class Comment extends ItemView {
    @props({
        template: require('../templates/comment.ejs'),

        className: 'item-comment col-xs-12'
    })

    initialize() {

    }
}

class Comments extends CompositeView {
    @props({
        className: 'layout-comments',

        ui: {
            loader: '.js-loader'
        },

        template: require('../templates/comments.ejs'),

        childView: Comment,

        childViewContainer: '.js-comments',

        model: new Model({
            _loading: false
        })
    })

    collectionEvents() {
        return {
            sync: '_onCollectionSync'
        }
    }

    bindings() {
        return {
            '@ui.loader': {
                classes: {
                    show: '_loading'
                }
            }
        }
    }

    set loading(val) {
        this.model.set('_loading', val);
    }

    onRender() {
        this._initScroll();

        this.stickit();
    }

    /**
     * Private methods
     */

    _fetch() {
        this._killScroll();

        if (_.isNull(this.collection.pageToken)) return;

        this.loading = true;

        this.collection.fetch()
            .then(() => {
                this.loading = false;
            });
    }

    _initScroll() {
        this._killScroll();

        $(window).on('scroll.comments', this._onScroll.bind(this));
    }

    _killScroll() {
        $(window).off('scroll.comments');
    }

    /**
     * Callbacks
     */

    _onCollectionSync() {
        this._initScroll();
    }

    _onScroll() {
        const maxY = $(document).height() - window.innerHeight - 200;
        const y    = window.scrollY;

        if (y >= maxY) {
            this._fetch();
        }
    }
}

export default Comments