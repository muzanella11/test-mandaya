<template>
  <v-simple-table
    v-if="tableHead.length > 0"
    class="c-table"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="(itemHead, indexHead) in tableHead"
            :key="indexHead"
            class="text-left"
          >
            {{ item.value }}
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-if="isLoading"
        >
          <tr
            v-for="(item, index) in 8"
            :key="index"
          >
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="avatar"
                :tile="false"
                style="padding: 8px 0;"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
            <td>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="false"
                type="table-cell"
                :tile="false"
                class="mx-auto"
              />
            </td>
          </tr>
        </template>

        <template
          v-else
        >
          <tr
            v-for="(item, index) in entries"
            :key="index"
          >
            <td>
              {{ item.id }}
            </td>
            <td>
              <img
                :alt="item.firstName"
                :src="item.avatar"
                width="50px"
              >
            </td>

            <td>
              {{ `${item.firstName} ${item.lastName}` }}
            </td>

            <td>
              {{ birthDate(item) }}
            </td>

            <td v-html="createdOrModified(item)" />

            <td v-html="createdOrModified(item, 'modified')" />

            <td>
              <ul class="list__action">
                <li>
                  <a href="javascript:;">
                    <v-icon>
                      mdi-eye-outline
                    </v-icon>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <v-icon>
                      mdi-square-edit-outline
                    </v-icon>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <v-icon>
                      mdi-trash-can-outline
                    </v-icon>
                  </a>
                </li>
              </ul>
            </td>
          </tr>

          <tr
            v-if="entries.length === 0"
            class="text-lg-center"
          >
            <td colspan="7">
              No Data Showing :(
            </td>
          </tr>
        </template>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    tableHead: {
      type: Array,
      default: () => ([])
    },
    entries: {
      type: Array,
      default: () => ([])
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      //
    }
  }
}
</script>
