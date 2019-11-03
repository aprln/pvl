<template>
    <div class="carousel">
        <div class="row q-mt-sm">
            <q-select square
                      filled
                      @input="onVenueSelected"
                      stack-label
                      class="col-sm-8 col-xs-12"
                      :value="$store.getters['selectedVenue']"
                      :options="$store.getters['venueNames']"
                      label="Select venues"></q-select>

            <q-field :label="discountLabel"
                     stack-label
                     class="col-sm-4 col-xs-12"
                     square
                     filled>
                <template v-slot:control>
                    <q-slider :value="$store.getters['selectedDiscount']"
                              @change="onDiscountSelected"
                              dense
                              :min="0"
                              :max="100"></q-slider>
                </template>
            </q-field>

        </div>
        <div class="carousel-container q-mt-sm">
            <q-btn round
                   icon="keyboard_arrow_left"
                   class="absolute-bottom-left q-mb-sm q-ml-sm z-top"
                   @click="onGoLeftClick"></q-btn>
            <q-btn round
                   icon="keyboard_arrow_right"
                   class="absolute-bottom-right q-mb-sm q-mr-sm z-top"
                   @click="onGoRightClick"></q-btn>
            <div v-for="d in deals"
                 :key="d.uniqueId"
                 class="carousel-item ">
                <div class="absolute q-ml-sm q-mt-sm text-bold">{{ d.name }}</div>
                <div class="absolute q-ml-sm q-mt-lg">{{ d.discount_percentage }}% discount</div>
                <div class="absolute-right q-mr-sm q-ml-sm q-mt-lg text-bold">Slide {{ d.id }}</div>
                <img :src="d.image"
                     class="carousel-img" />

            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'Carousel',
        data() {
            return {}
        },
        computed: {
            discountLabel() {
                return 'Discount from ' + this.$store.getters['selectedDiscount'] + '%'
            },
            deals() {
                return this.$store.getters['deals']
            }
        },
        methods: {
            onVenueSelected(value) {
                this.$store.dispatch('getDeals', {
                    name: value,
                    discount: this.$store.getters['selectedDiscount']
                })
            },
            onDiscountSelected(value) {
                this.$store.dispatch('getDeals', {
                    name: this.$store.getters['selectedVenue'],
                    discount: value
                })
            },
            onGoLeftClick() {
                this.$store.dispatch('slide', true)
            },
            onGoRightClick() {
                this.$store.dispatch('slide', false)
            }
        },
        mounted() {
            this.$store.dispatch('getDeals', {
                name: '',
                discount: 0
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .carousel-container {
        position: relative;
        display: block;
        height: 250px;
        overflow: hidden;
        white-space: nowrap;
    }

    .carousel-item {
        position: relative;
        display: inline-block;
        width: 250px;
        height: 250px;
        text-align: left;
    }

    .carousel-img {
        height: 250px;
        width: 250px;
        object-fit: cover;
        border: 1px solid grey;
    }


</style>
